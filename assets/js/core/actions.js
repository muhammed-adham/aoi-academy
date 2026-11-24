const handlers = { click: {}, submit: {}, change: {} };

export const onClick = (name, handler) => { handlers.click[name] = handler; };
export const onSubmit = (name, handler) => { handlers.submit[name] = handler; };
export const onChange = (name, handler) => { handlers.change[name] = handler; };

let started = false;

export function initActions() {
  if (started) return;
  started = true;

  document.addEventListener('click', (event) => {
    const element = event.target.closest('[data-action]');
    const handler = element && handlers.click[element.dataset.action];
    if (handler) handler(element, event);
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form[data-submit]');
    const handler = form && handlers.submit[form.dataset.submit];
    if (handler) handler(form, event);
  });

  document.addEventListener('change', (event) => {
    const element = event.target.closest('[data-change]');
    const handler = element && handlers.change[element.dataset.change];
    if (handler) handler(element, event);
  });
}
