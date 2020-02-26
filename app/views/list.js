import Marionette from 'backbone.marionette';
import ListTemplate from '../templates/list.hbs';

class Todo extends Marionette.LayoutView
{
  constructor(options)
  {
    options.template = ListTemplate;
    options.tagName = 'li';
    
    super(options);
  }

  modelEvents()
  {
    return {
      change: 'render',
    };
  }

  events() 
  {
    return {
      'click button': 'delete',
      'click span': 'edit',
      'click input[type="checkbox"]': 'checked',
      'focusout input[type="text"]': 'save'
    }
  }

  ui()
  {
    return {
      text: '#id_text',
    };
  }

  delete() 
  {
    this.model.destroy();
  }

  checked(e)
  {
    e.target.checked ? this.$el.addClass('checked') : this.$el.removeClass('checked')
  }

  edit(e) 
  {
    const prevText = e.currentTarget.innerText;
    
    this.model.set('prevText', prevText);
    this.model.set('isEditMode', true);
    this.moveCursorToEnd($('.edit-input'))
    this.$el.addClass('disabled');
    this.$el.removeClass('checked');
  }

  moveCursorToEnd(input) 
  {
    const originalValue = input.val();

    input.val('');
    input.blur().focus().val(originalValue);
  }

  save(e) 
  {
    const prevText = this.model.pick('prevText').prevText;
    const newText = e.target.value ? e.target.value : prevText;
    
    this.model.set('isEditMode', false);
    this.model.set('text', newText);
    this.$el.removeClass('disabled');
  }
}

export default class ListView extends Marionette.CollectionView
{
  constructor(options)
  {
    options.tagName = 'ul';
    options.childView = Todo;

    super(options);
  }
}