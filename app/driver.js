import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import TodoView from './views/layout';
import TodoModel from './models/todo';

export class TodoApp extends Marionette.Application
{
  onStart()
  {
    const todoView = new TodoView({
      collection: new Backbone.Collection(),
      model: new TodoModel()
    });
    todoView.render();
  }
}

window.app = new TodoApp;
window.app.start();