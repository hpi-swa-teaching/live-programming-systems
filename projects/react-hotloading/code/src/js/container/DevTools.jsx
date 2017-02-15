import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import SliderMonitor from 'redux-slider-monitor';
import Dispatcher from 'redux-devtools-dispatch';
import DiffMonitor from 'redux-devtools-diff-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey="ctrl-m">
      <MultipleMonitors>
        <LogMonitor theme='tomorrow' />
        <Dispatcher />
      </MultipleMonitors>
    <DiffMonitor />
    <SliderMonitor keyboardEnabled /> 
  </DockMonitor>
);