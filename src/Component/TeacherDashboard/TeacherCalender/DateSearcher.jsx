import React, { Component } from 'react';

export class DateSearcher extends Component {
    render() {
        return (<div className='property-panel-section'>
            <div className="property-panel-header">
                {this.props.title}
            </div>
            <div className="property-panel-content">
                {this.props.children}
            </div>
        </div>)

    }
}