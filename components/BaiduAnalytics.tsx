'use client'

import Script from 'next/script'

export default function BaiduAnalytics() {
  return (
    <Script id="baidu-analytics" strategy="afterInteractive">
      {`
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?85b635a42aeddc5a634899ed4a4984b3";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `}
    </Script>
  )
}
