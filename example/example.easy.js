'use strict';

/**
 * Example.easy - Easy usage
 */

const { Workbook, Topic, Zipper } = require('xmind');

const wb = new Workbook();
const topic = new Topic({sheet: wb.createSheet('sheet-1', 'central topic')});

const zip = new Zipper({path: '/tmp', workbook: wb});

topic
  .on()
  .add({title: 'main topic 1'})
  .add({title: 'main topic 2'})
  .add({title: 'main topic 2.2'})
  .add({title: 'main topic 3'})
  
  .on(topic.cid('main topic 1'))
  .add({title: 'subtopic 1 on main topic 1'})
  
  .on(topic.cid('main topic 2'))
  .add({title: 'subtopic 1 on main topic 2'})

  .on(topic.cid('subtopic 1 on main topic 2'))
  .add({title: 'test node'});


zip.save().then(status => status && console.log('Saved.'));
