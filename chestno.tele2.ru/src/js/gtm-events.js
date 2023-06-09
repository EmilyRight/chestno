// GTM EVENTS
export function gtmSet() {
  // click event
  const $body = document.querySelector('body');
  $body.addEventListener('click', (e) => {
    const _className = 'js-gtm-event';
    const $trg = (e.target.classList.contains(_className)) ? e.target : e.target.closest(`.${_className}`);
    if ($trg) {
      const $self = $trg;
      const dataClick = {
        eventAction: 'click',
        eventLabel: $self.getAttribute('data-event') || null,
        eventLocation: $self.getAttribute('data-section') || null,
        eventContext: $self.getAttribute('data-context') || null,
        eventCategory: $self.getAttribute('data-event-category') || 'Interactions',
      };
      gaPush(dataClick);
    }
  });

  /// scroll event
  let pageScrolling = false;
  document.addEventListener('scroll', (e) => {
    const currentPos = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    if (!pageScrolling) {
      window.requestAnimationFrame(() => { scrollEvt(currentPos); pageScrolling = false; });
      pageScrolling = true;
    }
  });

  const scrollGtm = {
    10: '', 30: '', 50: '', 70: '', 90: '',
  };
  function scrollEvt(scrollPos) {
    const points = Object.entries(scrollGtm);
    points.forEach(([p, val]) => {
      if (~~scrollPos >= p) {
        delete scrollGtm[p]; scrollEventPush(p);
      }
    });
  }
  function scrollEventPush(p) {
    const scrollEventData = {
      eventAction: 'scroll',
      eventLabel: 'scrollPage-' + `${p}%`,
      eventCategory: 'Interactions',
    };
    gaPush(scrollEventData); // console.log(scrollEventData)
  }
}

export function gaPush(d) {
  const fullEventData = {
    eventLabel: d.eventLabel,
    eventLocation: d.eventLocation || null, // data-section
    eventContext: d.eventContext || null,
    hitsTime: Date.now(),
    requestId: generateId(7),
    firingOptions: 'onesPerEvent',
    event: 'event',
    eventStream: 'flight',
    eventAction: d.eventAction,
    eventCategory: d.eventCategory,
    eventContent: d.eventContent || null,
    eventValue: d.eventValue || null,
    ecommerce: null,
    ecommerceAction: false,
    noninteraction: false,
  };
    /// Unique ID
  function dec2hex(dec) {
    return (`0${dec.toString(16)}`).substr(-2);
  }

  function generateId(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  try {
    dataLayer.push(fullEventData);
  } catch (e) {
    console.log(fullEventData);
  }
}
