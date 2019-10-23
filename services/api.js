import API from './index';
import {Service} from '../constants/index';

const Api = new API({
  baseUrl: Service.baseUrl,
});

export default Api;
