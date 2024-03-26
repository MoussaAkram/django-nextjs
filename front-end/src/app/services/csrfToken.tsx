import React, { useEffect, useState } from 'react'

export default function CSRFToken() {
  const [csrftoken, setCsrftoken] = useState('')

  const getCookie = (name: any) => {
    let cookieValue = null;
    if (typeof document !== 'undefined' && document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  const csrfToken = getCookie('csrftoken')

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        if(csrfToken)
          setCsrftoken(csrfToken);
        console.log(csrfToken)
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, [csrfToken]);

  return null

}
