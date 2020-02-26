import Marionette from 'backbone.marionette';
import FormTemplate from '../templates/form.hbs';

export default class FormView extends Marionette.LayoutView
{
  constructor(options)
  {
    options.template =  FormTemplate;
    options.tagName = 'form';

    super(options);
  }

  events() 
  {
    return {
      'keyup #todo-item': 'inputCheck'
    }
  }

  triggers()
  {
    return {
      submit: 'add:todo:item'
    };
  }

  modelEvents()
  {
    return {
      change: 'render'
    };
  }

  inputCheck(e) 
  {
    if(!e.target.value) {
      $('#add-btn').attr('disabled', true)
    } else {
      $('#add-btn').removeAttr('disabled')
    }
  }

  ui()
  {
    return {
      text: '#todo-item'
    };
  }
}