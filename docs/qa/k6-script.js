import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://localhost:4000/api/drills');
  sleep(1);
}
