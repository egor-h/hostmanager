import { HomePageModel } from '../models/mainPage';
import { home } from '../state/actions';
import api from './base';
import { get } from './basicCrud';
import { BASE_URL, getRequest } from './common';

const API_RECENTS = '/api/v1/welcome';

export const fetchRecents = () => get<HomePageModel>({
    url: API_RECENTS,
    actionBeforeFetch: home.homepage,
    actionOnSuccess: home.homepageSucceeded,
    actionOnError: home.homepageFailed
});