// eslint-disable-next-line
import Axios from './Axios';
// eslint-disable-next-line
import Sessions from './Sessions';

// eslint-disable-next-line
const { error } = console;

const defaultOption = {
  i18n: () => { error('i18n is required'); },
  showToast: () => { error('showToast is required'); },
  showLoading: () => { error('showLoading is required'); },
  hideLoading: () => { error('hideLoading is required'); },
  storage: {
    getItem: () => { error('storage.getItem is required'); },
    setItem: () => { error('storage.setItem is required'); },
    removeItem: () => { error('storage.removeItem is required'); },
    clear: () => { error('storage.clear is required'); },
  },
};

export default class Engine {
  static _option = {}

  static init = async option => {
    try {
      Engine._option = Object.assign({}, defaultOption, option);
      Axios.init();
      await Sessions.init(option.params);
      if (option.onInitSuccess) {
        option.onInitSuccess();
      }
    } catch (err) {
      error(err);
      if (option.onInitFailure) {
        option.onInitFailure(err);
      }
    }
  }

  static getApiEndpoint = () => Engine._option.apiEndpoint

  static i18n = (...args) => Engine._option.i18n.apply(null, args)

  static showToast = options => {
    Engine._option.showToast(options);
  }

  static showLoading = () => {
    Engine._option.showLoading();
  }

  static hideLoading = () => {
    Engine._option.hideLoading();
  }

  static getItem = (key, { isTemporary } = {}) => Engine._option.storage.getItem(key, isTemporary)

  static setItem = (key, value, { isTemporary } = {}) => Engine._option.storage.setItem(key, value, isTemporary)

  static removeItem = (key, { isTemporary } = {}) => Engine._option.storage.removeItem(key, isTemporary)

  static clear = ({ isTemporary } = {}) => Engine._option.storage.clear(isTemporary)
}
