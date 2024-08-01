import './bootstrap';

import '/node_modules/.vite/deps/@facephi_selphi-widget-web.js';
import '/node_modules/.vite/deps/@facephi_selphid-widget-web.js';
import { defineCustomElements } from '/node_modules/.vite/deps/@facephi_sdk-web-wc_loader.js';

defineCustomElements(window);
