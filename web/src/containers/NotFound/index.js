import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */


const metaData = {
  title: '404 Page Not Found',
  description: 'Homecare',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'homecare, bla, bla',
    },
  },
};

export class NotFound extends Component {
  render() {
    return (
      <div id="main">
        <DocumentMeta {...metaData} />
        <div className="content">
          <h3>NotFound</h3>
        </div>
      </div>
    );
  }
}
