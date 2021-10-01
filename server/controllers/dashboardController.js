const fs = require('fs');
const path = require('path');
const dashboardController = {};
const {models: {Foods,Entries}} = require('../../sql/sequelize');