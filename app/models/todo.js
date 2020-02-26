import Backbone from 'backbone';

export default class TodoModel extends Backbone.Model
{
  defaults()
  {
    return {
      text: ''
    };
  }

  validate(attrs)
  {
    const errors = {};
    let hasError = false;

    if (!attrs.text)
    {
      errors.text = 'text must be set';
      hasError = true;
    }
    if (hasError) return errors;
  }
}