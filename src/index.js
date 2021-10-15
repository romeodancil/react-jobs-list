import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes'
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/rest', proxy('https://www.zippia.com/', {
  proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = '0.0.0:5000';
    return opts;
  }
}));

app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
    }
  });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);
    console.log('context', context);
    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening to port 5000')
});
