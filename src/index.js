//import './_game.scss';

import $ from 'jquery';

import {Game} from './Game';
import {parse_json} from "./parse_json";

$(document).ready(function() {
    new Game('.game');
});