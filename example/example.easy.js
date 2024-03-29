'use strict';

const { filter } = require('jszip');
const { couldStartTrivia } = require('typescript');
/**
 * Example.easy - Easy usage
 */

const { Workbook, Topic, Zipper,Marker } = require('xmind');

const wb = new Workbook();
const topic = new Topic({sheet: wb.createSheet('sheet-1', 'central topic')});

const zip = new Zipper({path: '/tmp', workbook: wb});
const marker = new Marker();




  

  // validate(topic);



zip.save().then(status => status && console.log('Saved.'));
