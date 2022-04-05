import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests
// const myRate = new Rate('my_rate');

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  discardResponseBodies: true,
  scenarios: {
    // ramp: {
    //   executor: 'ramping-arrival-rate',
    //   startRate: 1,
    //   timeUnit: '1s',
    //   preAllocatedVUs: 1,
    //   maxVUs: 50,
    //   stages: [
    //     { target: 1000000, duration: '30s' },
    //   ],
    // },
    const: {
      executor: 'constant-vus',
      vus: 10,
      duration: '2m'
    },
  }
};


export default function () {

  const res = http.get('http://localhost:8080/hello');

  // sleep(1);

  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
