/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Advanced Analytics tracking utility (Google Analytics + Meta Pixel)

const isDevelopment = 
  typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname.startsWith('192.168.'));

// Cache to prevent duplicate firing of events in the same session
const firedEvents = new Set<string>();

export const trackEvent = (eventName: string, params?: Record<string, any>, once = false) => {
  const eventKey = once ? `${eventName}_${JSON.stringify(params)}` : '';
  if (once && firedEvents.has(eventKey)) return;
  if (once) firedEvents.add(eventKey);

  if (!isDevelopment && typeof window !== 'undefined') {
    // Google Analytics
    if (typeof (window as any).gtag === 'function') {
      try {
        (window as any).gtag('event', eventName, params);
      } catch (err) {
        console.warn('[GA] Failed to send event:', err);
      }
    }

    // Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      try {
        // Map common events to Meta standard events if needed, or send as trackCustom
        const metaEventMap: Record<string, string> = {
          'quiz_complete': 'CompleteRegistration',
          'product_click': 'Purchase',
          'view_intent': 'ViewContent',
          'view_commitment': 'InitiateCheckout'
        };

        const metaEventName = metaEventMap[eventName] || eventName;
        
        if (eventName === 'product_click') {
          (window as any).fbq('track', 'Purchase', {
            content_name: params?.item_name,
            content_category: params?.item_category,
            value: 10,
            currency: 'USD'
          });
        } else if (eventName === 'view_intent') {
          (window as any).fbq('track', 'ViewContent', {
            category: params?.category
          });
        } else if (eventName === 'view_commitment') {
          // Map commitment levels to Meta events
          if (params?.level === 'high') {
            (window as any).fbq('track', 'AddToCart');
          } else if (params?.level === 'medium') {
            (window as any).fbq('track', 'InitiateCheckout');
          } else {
            (window as any).fbq('track', 'ViewContent');
          }
        } else if (eventName === 'quiz_complete') {
          (window as any).fbq('track', 'CompleteRegistration', {
            goal: params?.goal,
            lifestyle: params?.lifestyle
          });
        } else {
          (window as any).fbq('trackCustom', metaEventName, params);
        }
      } catch (err) {
        console.warn('[Meta] Failed to send event:', err);
      }
    }
  } else {
    console.log(`[Analytics ${isDevelopment ? 'Dev' : 'Blocked'}] Event: ${eventName}`, params);
  }
};

export const trackStepView = (stepName: string) => {
  trackEvent('quiz_step_view', {
    step_name: stepName,
    page_title: `Quiz Step: ${stepName}`
  }, true); // Fire once per step
};

export const trackConversion = (method: string, metadata?: Record<string, any>) => {
  trackEvent('quiz_complete', {
    method: method,
    ...metadata
  }, true);
};

export const trackMetaIntent = (goal: string) => {
  let category = 'Fitness';
  if (goal === 'weight_loss') category = 'Weight Loss';
  if (goal === 'flexibility') category = 'Yoga';
  
  trackEvent('view_intent', { category }, true);
};

export const trackMetaCommitment = (timeAvailable: string) => {
  // Logic: > 30m = high, 15-30m = medium, < 15m = low
  let level = 'low';
  if (timeAvailable.includes('30+') || timeAvailable.includes('45+')) level = 'high';
  else if (timeAvailable.includes('15-30')) level = 'medium';

  trackEvent('view_commitment', { level }, true);
};

export const trackMetaProductClick = (title: string, category: string) => {
  trackEvent('product_click', {
    item_name: title,
    item_category: category
  });
};
