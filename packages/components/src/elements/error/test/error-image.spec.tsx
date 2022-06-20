/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { ErrorImage } from '../error-image';

describe('railz-error-image', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      html: `<railz-error-image></railz-error-image>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="64px" viewBox="0 0 88 64" width="88px" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1542_29859)">
              <path d="M40.6629 43.8093L36.9534 46.0282C33.2658 48.234 28.4881 47.0328 26.2823 43.3452V43.3452C24.0764 39.6575 25.2777 34.8799 28.9653 32.674L32.6748 30.4551" stroke="#949494" stroke-width="1.5"></path>
              <path d="M48.6242 20.9134L52.3337 18.6945C56.0213 16.4886 60.799 17.6898 63.0048 21.3775V21.3775C65.2107 25.0652 64.0095 29.8428 60.3218 32.0487L56.6123 34.2676" stroke="#949494" stroke-width="1.5"></path>
              <rect height="2.8225" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(59.1132 34.4953 28.222)" width="17.519" x="34.4953" y="28.222"></rect>
              <rect height="2.82249" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(-120.887 55.162 36.2741)" width="17.519" x="55.162" y="36.2741"></rect>
              <path d="M36.972 30.9057L41.7944 28.0211C42.409 27.6535 43.2053 27.8537 43.5729 28.4683V28.4683C43.9405 29.0829 43.7403 29.8792 43.1257 30.2468L38.3034 33.1314" stroke="#949494" stroke-width="1.5"></path>
              <path d="M40.9681 37.5835L45.7905 34.6989C46.4051 34.3312 47.2014 34.5314 47.569 35.1461V35.1461C47.9366 35.7607 47.7364 36.5569 47.1218 36.9246L42.2995 39.8092" stroke="#949494" stroke-width="1.5"></path>
              <path d="M25.3955 41.8594L15.7508 47.6286" stroke="#949494" stroke-width="1.5"></path>
              <path d="M63.5225 23.082L73.1671 17.3128" stroke="#949494" stroke-width="1.5"></path>
              <path d="M27.1694 44.8281L17.5247 50.5973" stroke="#949494" stroke-width="1.5"></path>
              <path d="M61.7471 20.1152L71.3918 14.346" stroke="#949494" stroke-width="1.5"></path>
              <path d="M37.0234 21.8421L32.2769 17.9941" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M54.4273 41.3844L59.1738 45.2324" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M41.8508 18.987L40.5732 13.0117" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M49.5994 44.2395L50.877 50.2148" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
            </g>
            <defs>
              <clipPath id="clip0_1542_29859">
                <rect fill="white" height="64" width="88"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="railz-error-title">
            Oops, something went wrong
          </p>
        </div>
      </mock:shadow-root>
      </railz-error-image>
    `);
  });

  it('renders statusCode 202', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image statusCode={202}></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="56px" viewBox="0 0 48 56" width="48px" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.4039 34.4906V18.9361C37.4039 18.1389 37.0865 17.3744 36.522 16.8115L27.5587 7.87546C26.9964 7.31482 26.2347 7 25.4406 7H9C7.34314 7 6 8.34315 6 10V41.7995C6 43.4564 7.34315 44.7995 9 44.7995H27.4465" stroke="#949494" stroke-width="2"></path>
            <path d="M26.6812 7V15.0726C26.6812 16.7294 28.0243 18.0726 29.6812 18.0726H37.4044" stroke="#949494" stroke-width="2"></path>
            <ellipse cx="34.7238" cy="41.7437" rx="7.2765" ry="7.25445" stroke="#949494" stroke-width="2"></ellipse>
            <path d="M10.5962 12.1094C10.0439 12.1094 9.59619 12.5571 9.59619 13.1094C9.59619 13.6617 10.0439 14.1094 10.5962 14.1094V12.1094ZM22.4684 14.1094C23.0207 14.1094 23.4684 13.6617 23.4684 13.1094C23.4684 12.5571 23.0207 12.1094 22.4684 12.1094V14.1094ZM10.5962 14.1094H22.4684V12.1094H10.5962V14.1094Z" fill="#949494"></path>
            <path d="M10.5962 17.4541C10.0439 17.4541 9.59619 17.9018 9.59619 18.4541C9.59619 19.0064 10.0439 19.4541 10.5962 19.4541V17.4541ZM22.4684 19.4541C23.0207 19.4541 23.4684 19.0064 23.4684 18.4541C23.4684 17.9018 23.0207 17.4541 22.4684 17.4541V19.4541ZM10.5962 19.4541H22.4684V17.4541H10.5962V19.4541Z" fill="#949494"></path>
            <path d="M10.5962 22.8008C10.0439 22.8008 9.59619 23.2485 9.59619 23.8008C9.59619 24.3531 10.0439 24.8008 10.5962 24.8008V22.8008ZM32.8087 24.8008C33.361 24.8008 33.8087 24.3531 33.8087 23.8008C33.8087 23.2485 33.361 22.8008 32.8087 22.8008V24.8008ZM10.5962 24.8008H32.8087V22.8008H10.5962V24.8008Z" fill="#949494"></path>
            <path d="M10.5962 28.1455C10.0439 28.1455 9.59619 28.5932 9.59619 29.1455C9.59619 29.6978 10.0439 30.1455 10.5962 30.1455V28.1455ZM32.8087 30.1455C33.361 30.1455 33.8087 29.6978 33.8087 29.1455C33.8087 28.5932 33.361 28.1455 32.8087 28.1455V30.1455ZM10.5962 30.1455H32.8087V28.1455H10.5962V30.1455Z" fill="#949494"></path>
            <path d="M10.5962 33.4893C10.0439 33.4893 9.59619 33.937 9.59619 34.4893C9.59619 35.0415 10.0439 35.4893 10.5962 35.4893V33.4893ZM24.7662 35.4893C25.3185 35.4893 25.7662 35.0415 25.7662 34.4893C25.7662 33.937 25.3185 33.4893 24.7662 33.4893V35.4893ZM10.5962 35.4893H24.7662V33.4893H10.5962V35.4893Z" fill="#949494"></path>
            <path d="M10.5962 38.8369C10.0439 38.8369 9.59619 39.2846 9.59619 39.8369C9.59619 40.3892 10.0439 40.8369 10.5962 40.8369V38.8369ZM24.7662 40.8369C25.3185 40.8369 25.7662 40.3892 25.7662 39.8369C25.7662 39.2846 25.3185 38.8369 24.7662 38.8369V40.8369ZM10.5962 40.8369H24.7662V38.8369H10.5962V40.8369Z" fill="#949494"></path>
            <ellipse cx="34.7227" cy="41.745" fill="#949494" rx="1.14892" ry="1.14544"></ellipse>
            <ellipse cx="38.5522" cy="41.745" fill="#949494" rx="1.14892" ry="1.14544"></ellipse>
            <ellipse cx="30.8931" cy="41.745" fill="#949494" rx="1.14892" ry="1.14544"></ellipse>
          </svg>
          <p class="railz-error-title">
            Data currently unavailable
          </p>
        </div>
      </mock:shadow-root>
    </railz-error-image>
    `);
  });

  it('renders statusCode 204', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image statusCode={204}></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
       <mock:shadow-root>
         <div>
           <svg aria-hidden="true" fill="none" height="56px" viewBox="0 0 48 56" width="48px" xmlns="http://www.w3.org/2000/svg">
             <path d="M37.4044 34.491V18.9363C37.4044 18.139 37.0871 17.3746 36.5225 16.8117L27.5591 7.87546C26.9967 7.31482 26.235 7 25.441 7H9C7.34314 7 6 8.34315 6 10V41.8002C6 43.457 7.34315 44.8002 9 44.8002H27.4469" stroke="#949494" stroke-width="2"></path>
             <path d="M26.6812 7V15.0728C26.6812 16.7296 28.0243 18.0728 29.6812 18.0728H37.4046" stroke="#949494" stroke-width="2"></path>
             <ellipse cx="34.7234" cy="41.7448" rx="7.27663" ry="7.25458" stroke="#949494" stroke-width="2"></ellipse>
             <path d="M38.0438 45.0562C37.7709 45.3283 37.3161 45.3283 37.0432 45.0562L34.7238 42.7438L32.4044 45.0562C32.1315 45.3283 31.6767 45.3283 31.4039 45.0562C31.131 44.7842 31.131 44.3308 31.4039 44.0587L33.7233 41.7463L31.4039 39.434C31.131 39.1619 31.131 38.7085 31.4039 38.4364C31.6767 38.1644 32.1315 38.1644 32.4044 38.4364L34.7238 40.7488L37.0432 38.4364C37.3161 38.1644 37.7709 38.1644 38.0438 38.4364C38.3166 38.7085 38.3166 39.1619 38.0438 39.434L35.7244 41.7463L38.0438 44.0587C38.3166 44.3308 38.3166 44.7842 38.0438 45.0562Z" fill="#949494"></path>
             <path d="M10.5957 12.1094C10.0434 12.1094 9.5957 12.5571 9.5957 13.1094C9.5957 13.6617 10.0434 14.1094 10.5957 14.1094V12.1094ZM22.4681 14.1094C23.0204 14.1094 23.4681 13.6617 23.4681 13.1094C23.4681 12.5571 23.0204 12.1094 22.4681 12.1094V14.1094ZM10.5957 14.1094H22.4681V12.1094H10.5957V14.1094Z" fill="#949494"></path>
             <path d="M10.5957 17.4551C10.0434 17.4551 9.5957 17.9028 9.5957 18.4551C9.5957 19.0074 10.0434 19.4551 10.5957 19.4551V17.4551ZM22.4681 19.4551C23.0204 19.4551 23.4681 19.0074 23.4681 18.4551C23.4681 17.9028 23.0204 17.4551 22.4681 17.4551V19.4551ZM10.5957 19.4551H22.4681V17.4551H10.5957V19.4551Z" fill="#949494"></path>
             <path d="M10.5957 22.8008C10.0434 22.8008 9.5957 23.2485 9.5957 23.8008C9.5957 24.3531 10.0434 24.8008 10.5957 24.8008V22.8008ZM32.8086 24.8008C33.3609 24.8008 33.8086 24.3531 33.8086 23.8008C33.8086 23.2485 33.3609 22.8008 32.8086 22.8008V24.8008ZM10.5957 24.8008H32.8086V22.8008H10.5957V24.8008Z" fill="#949494"></path>
             <path d="M10.5957 28.1445C10.0434 28.1445 9.5957 28.5922 9.5957 29.1445C9.5957 29.6968 10.0434 30.1445 10.5957 30.1445V28.1445ZM32.8086 30.1445C33.3609 30.1445 33.8086 29.6968 33.8086 29.1445C33.8086 28.5922 33.3609 28.1445 32.8086 28.1445V30.1445ZM10.5957 30.1445H32.8086V28.1445H10.5957V30.1445Z" fill="#949494"></path>
             <path d="M10.5957 33.4902C10.0434 33.4902 9.5957 33.9379 9.5957 34.4902C9.5957 35.0425 10.0434 35.4902 10.5957 35.4902V33.4902ZM24.766 35.4902C25.3183 35.4902 25.766 35.0425 25.766 34.4902C25.766 33.9379 25.3183 33.4902 24.766 33.4902V35.4902ZM10.5957 35.4902H24.766V33.4902H10.5957V35.4902Z" fill="#949494"></path>
             <path d="M10.5957 38.8359C10.0434 38.8359 9.5957 39.2837 9.5957 39.8359C9.5957 40.3882 10.0434 40.8359 10.5957 40.8359V38.8359ZM24.766 40.8359C25.3183 40.8359 25.766 40.3882 25.766 39.8359C25.766 39.2837 25.3183 38.8359 24.766 38.8359V40.8359ZM10.5957 40.8359H24.766V38.8359H10.5957V40.8359Z" fill="#949494"></path>
           </svg>
           <p class="railz-error-title">
             No data available
           </p>
         </div>
       </mock:shadow-root>
    </railz-error-image>
    `);
  });

  it('renders statusCode 404', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image statusCode={404}></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
    <mock:shadow-root>
      <div>
        <svg aria-hidden="true" fill="none" height="56px" viewBox="0 0 48 56" width="48px" xmlns="http://www.w3.org/2000/svg">
          <path d="M37.4044 34.491V18.9363C37.4044 18.139 37.0871 17.3746 36.5225 16.8117L27.5591 7.87546C26.9967 7.31482 26.235 7 25.441 7H9C7.34314 7 6 8.34315 6 10V41.8002C6 43.457 7.34315 44.8002 9 44.8002H27.4469" stroke="#949494" stroke-width="2"></path>
          <path d="M26.6812 7V15.0728C26.6812 16.7296 28.0243 18.0728 29.6812 18.0728H37.4046" stroke="#949494" stroke-width="2"></path>
          <ellipse cx="34.7234" cy="41.7448" rx="7.27663" ry="7.25458" stroke="#949494" stroke-width="2"></ellipse>
          <path d="M38.0438 45.0562C37.7709 45.3283 37.3161 45.3283 37.0432 45.0562L34.7238 42.7438L32.4044 45.0562C32.1315 45.3283 31.6767 45.3283 31.4039 45.0562C31.131 44.7842 31.131 44.3308 31.4039 44.0587L33.7233 41.7463L31.4039 39.434C31.131 39.1619 31.131 38.7085 31.4039 38.4364C31.6767 38.1644 32.1315 38.1644 32.4044 38.4364L34.7238 40.7488L37.0432 38.4364C37.3161 38.1644 37.7709 38.1644 38.0438 38.4364C38.3166 38.7085 38.3166 39.1619 38.0438 39.434L35.7244 41.7463L38.0438 44.0587C38.3166 44.3308 38.3166 44.7842 38.0438 45.0562Z" fill="#949494"></path>
          <path d="M10.5957 12.1094C10.0434 12.1094 9.5957 12.5571 9.5957 13.1094C9.5957 13.6617 10.0434 14.1094 10.5957 14.1094V12.1094ZM22.4681 14.1094C23.0204 14.1094 23.4681 13.6617 23.4681 13.1094C23.4681 12.5571 23.0204 12.1094 22.4681 12.1094V14.1094ZM10.5957 14.1094H22.4681V12.1094H10.5957V14.1094Z" fill="#949494"></path>
          <path d="M10.5957 17.4551C10.0434 17.4551 9.5957 17.9028 9.5957 18.4551C9.5957 19.0074 10.0434 19.4551 10.5957 19.4551V17.4551ZM22.4681 19.4551C23.0204 19.4551 23.4681 19.0074 23.4681 18.4551C23.4681 17.9028 23.0204 17.4551 22.4681 17.4551V19.4551ZM10.5957 19.4551H22.4681V17.4551H10.5957V19.4551Z" fill="#949494"></path>
          <path d="M10.5957 22.8008C10.0434 22.8008 9.5957 23.2485 9.5957 23.8008C9.5957 24.3531 10.0434 24.8008 10.5957 24.8008V22.8008ZM32.8086 24.8008C33.3609 24.8008 33.8086 24.3531 33.8086 23.8008C33.8086 23.2485 33.3609 22.8008 32.8086 22.8008V24.8008ZM10.5957 24.8008H32.8086V22.8008H10.5957V24.8008Z" fill="#949494"></path>
          <path d="M10.5957 28.1445C10.0434 28.1445 9.5957 28.5922 9.5957 29.1445C9.5957 29.6968 10.0434 30.1445 10.5957 30.1445V28.1445ZM32.8086 30.1445C33.3609 30.1445 33.8086 29.6968 33.8086 29.1445C33.8086 28.5922 33.3609 28.1445 32.8086 28.1445V30.1445ZM10.5957 30.1445H32.8086V28.1445H10.5957V30.1445Z" fill="#949494"></path>
          <path d="M10.5957 33.4902C10.0434 33.4902 9.5957 33.9379 9.5957 34.4902C9.5957 35.0425 10.0434 35.4902 10.5957 35.4902V33.4902ZM24.766 35.4902C25.3183 35.4902 25.766 35.0425 25.766 34.4902C25.766 33.9379 25.3183 33.4902 24.766 33.4902V35.4902ZM10.5957 35.4902H24.766V33.4902H10.5957V35.4902Z" fill="#949494"></path>
          <path d="M10.5957 38.8359C10.0434 38.8359 9.5957 39.2837 9.5957 39.8359C9.5957 40.3882 10.0434 40.8359 10.5957 40.8359V38.8359ZM24.766 40.8359C25.3183 40.8359 25.766 40.3882 25.766 39.8359C25.766 39.2837 25.3183 38.8359 24.766 38.8359V40.8359ZM10.5957 40.8359H24.766V38.8359H10.5957V40.8359Z" fill="#949494"></path>
        </svg>
        <p class="railz-error-title">
          No data available
        </p>
      </div>
    </mock:shadow-root>
  </railz-error-image>
    `);
  });

  it('renders statusCode 500', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image statusCode={500}></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="64px" viewBox="0 0 88 64" width="88px" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1542_29859)">
              <path d="M40.6629 43.8093L36.9534 46.0282C33.2658 48.234 28.4881 47.0328 26.2823 43.3452V43.3452C24.0764 39.6575 25.2777 34.8799 28.9653 32.674L32.6748 30.4551" stroke="#949494" stroke-width="1.5"></path>
              <path d="M48.6242 20.9134L52.3337 18.6945C56.0213 16.4886 60.799 17.6898 63.0048 21.3775V21.3775C65.2107 25.0652 64.0095 29.8428 60.3218 32.0487L56.6123 34.2676" stroke="#949494" stroke-width="1.5"></path>
              <rect height="2.8225" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(59.1132 34.4953 28.222)" width="17.519" x="34.4953" y="28.222"></rect>
              <rect height="2.82249" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(-120.887 55.162 36.2741)" width="17.519" x="55.162" y="36.2741"></rect>
              <path d="M36.972 30.9057L41.7944 28.0211C42.409 27.6535 43.2053 27.8537 43.5729 28.4683V28.4683C43.9405 29.0829 43.7403 29.8792 43.1257 30.2468L38.3034 33.1314" stroke="#949494" stroke-width="1.5"></path>
              <path d="M40.9681 37.5835L45.7905 34.6989C46.4051 34.3312 47.2014 34.5314 47.569 35.1461V35.1461C47.9366 35.7607 47.7364 36.5569 47.1218 36.9246L42.2995 39.8092" stroke="#949494" stroke-width="1.5"></path>
              <path d="M25.3955 41.8594L15.7508 47.6286" stroke="#949494" stroke-width="1.5"></path>
              <path d="M63.5225 23.082L73.1671 17.3128" stroke="#949494" stroke-width="1.5"></path>
              <path d="M27.1694 44.8281L17.5247 50.5973" stroke="#949494" stroke-width="1.5"></path>
              <path d="M61.7471 20.1152L71.3918 14.346" stroke="#949494" stroke-width="1.5"></path>
              <path d="M37.0234 21.8421L32.2769 17.9941" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M54.4273 41.3844L59.1738 45.2324" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M41.8508 18.987L40.5732 13.0117" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M49.5994 44.2395L50.877 50.2148" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
            </g>
            <defs>
              <clipPath id="clip0_1542_29859">
                <rect fill="white" height="64" width="88"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="railz-error-title">
            Oops, something went wrong
          </p>
        </div>
      </mock:shadow-root>
    </railz-error-image>
    `);
  });

  it('renders with fillColor', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image fillColor="#000000"></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="64px" viewBox="0 0 88 64" width="88px" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1542_29859)">
              <path d="M40.6629 43.8093L36.9534 46.0282C33.2658 48.234 28.4881 47.0328 26.2823 43.3452V43.3452C24.0764 39.6575 25.2777 34.8799 28.9653 32.674L32.6748 30.4551" stroke="#000000" stroke-width="1.5"></path>
              <path d="M48.6242 20.9134L52.3337 18.6945C56.0213 16.4886 60.799 17.6898 63.0048 21.3775V21.3775C65.2107 25.0652 64.0095 29.8428 60.3218 32.0487L56.6123 34.2676" stroke="#000000" stroke-width="1.5"></path>
              <rect height="2.8225" rx="1.41125" stroke="#000000" stroke-width="1.5" transform="rotate(59.1132 34.4953 28.222)" width="17.519" x="34.4953" y="28.222"></rect>
              <rect height="2.82249" rx="1.41125" stroke="#000000" stroke-width="1.5" transform="rotate(-120.887 55.162 36.2741)" width="17.519" x="55.162" y="36.2741"></rect>
              <path d="M36.972 30.9057L41.7944 28.0211C42.409 27.6535 43.2053 27.8537 43.5729 28.4683V28.4683C43.9405 29.0829 43.7403 29.8792 43.1257 30.2468L38.3034 33.1314" stroke="#000000" stroke-width="1.5"></path>
              <path d="M40.9681 37.5835L45.7905 34.6989C46.4051 34.3312 47.2014 34.5314 47.569 35.1461V35.1461C47.9366 35.7607 47.7364 36.5569 47.1218 36.9246L42.2995 39.8092" stroke="#000000" stroke-width="1.5"></path>
              <path d="M25.3955 41.8594L15.7508 47.6286" stroke="#000000" stroke-width="1.5"></path>
              <path d="M63.5225 23.082L73.1671 17.3128" stroke="#000000" stroke-width="1.5"></path>
              <path d="M27.1694 44.8281L17.5247 50.5973" stroke="#000000" stroke-width="1.5"></path>
              <path d="M61.7471 20.1152L71.3918 14.346" stroke="#000000" stroke-width="1.5"></path>
              <path d="M37.0234 21.8421L32.2769 17.9941" stroke="#000000" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M54.4273 41.3844L59.1738 45.2324" stroke="#000000" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M41.8508 18.987L40.5732 13.0117" stroke="#000000" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M49.5994 44.2395L50.877 50.2148" stroke="#000000" stroke-line-cap="round" stroke-width="1.5"></path>
            </g>
            <defs>
              <clipPath id="clip0_1542_29859">
                <rect fill="white" height="64" width="88"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="railz-error-title">
            Oops, something went wrong
          </p>
        </div>
      </mock:shadow-root>
    </railz-error-image>
    `);
  });

  it('renders with width', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image width="24px"></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="64px" viewBox="0 0 88 64" width="24px" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1542_29859)">
              <path d="M40.6629 43.8093L36.9534 46.0282C33.2658 48.234 28.4881 47.0328 26.2823 43.3452V43.3452C24.0764 39.6575 25.2777 34.8799 28.9653 32.674L32.6748 30.4551" stroke="#949494" stroke-width="1.5"></path>
              <path d="M48.6242 20.9134L52.3337 18.6945C56.0213 16.4886 60.799 17.6898 63.0048 21.3775V21.3775C65.2107 25.0652 64.0095 29.8428 60.3218 32.0487L56.6123 34.2676" stroke="#949494" stroke-width="1.5"></path>
              <rect height="2.8225" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(59.1132 34.4953 28.222)" width="17.519" x="34.4953" y="28.222"></rect>
              <rect height="2.82249" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(-120.887 55.162 36.2741)" width="17.519" x="55.162" y="36.2741"></rect>
              <path d="M36.972 30.9057L41.7944 28.0211C42.409 27.6535 43.2053 27.8537 43.5729 28.4683V28.4683C43.9405 29.0829 43.7403 29.8792 43.1257 30.2468L38.3034 33.1314" stroke="#949494" stroke-width="1.5"></path>
              <path d="M40.9681 37.5835L45.7905 34.6989C46.4051 34.3312 47.2014 34.5314 47.569 35.1461V35.1461C47.9366 35.7607 47.7364 36.5569 47.1218 36.9246L42.2995 39.8092" stroke="#949494" stroke-width="1.5"></path>
              <path d="M25.3955 41.8594L15.7508 47.6286" stroke="#949494" stroke-width="1.5"></path>
              <path d="M63.5225 23.082L73.1671 17.3128" stroke="#949494" stroke-width="1.5"></path>
              <path d="M27.1694 44.8281L17.5247 50.5973" stroke="#949494" stroke-width="1.5"></path>
              <path d="M61.7471 20.1152L71.3918 14.346" stroke="#949494" stroke-width="1.5"></path>
              <path d="M37.0234 21.8421L32.2769 17.9941" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M54.4273 41.3844L59.1738 45.2324" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M41.8508 18.987L40.5732 13.0117" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M49.5994 44.2395L50.877 50.2148" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
            </g>
            <defs>
              <clipPath id="clip0_1542_29859">
                <rect fill="white" height="64" width="88"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="railz-error-title">
            Oops, something went wrong
          </p>
        </div>
      </mock:shadow-root>
    </railz-error-image>
    `);
  });

  it('renders with textStyle', async () => {
    const page = await newSpecPage({
      components: [ErrorImage],
      template: () => <railz-error-image textStyle={{ 'font-size': '50px' }}></railz-error-image>,
    });
    expect(page.root).toEqualHtml(`
    <railz-error-image>
      <mock:shadow-root>
        <div>
          <svg aria-hidden="true" fill="none" height="64px" viewBox="0 0 88 64" width="88px" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1542_29859)">
              <path d="M40.6629 43.8093L36.9534 46.0282C33.2658 48.234 28.4881 47.0328 26.2823 43.3452V43.3452C24.0764 39.6575 25.2777 34.8799 28.9653 32.674L32.6748 30.4551" stroke="#949494" stroke-width="1.5"></path>
              <path d="M48.6242 20.9134L52.3337 18.6945C56.0213 16.4886 60.799 17.6898 63.0048 21.3775V21.3775C65.2107 25.0652 64.0095 29.8428 60.3218 32.0487L56.6123 34.2676" stroke="#949494" stroke-width="1.5"></path>
              <rect height="2.8225" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(59.1132 34.4953 28.222)" width="17.519" x="34.4953" y="28.222"></rect>
              <rect height="2.82249" rx="1.41125" stroke="#949494" stroke-width="1.5" transform="rotate(-120.887 55.162 36.2741)" width="17.519" x="55.162" y="36.2741"></rect>
              <path d="M36.972 30.9057L41.7944 28.0211C42.409 27.6535 43.2053 27.8537 43.5729 28.4683V28.4683C43.9405 29.0829 43.7403 29.8792 43.1257 30.2468L38.3034 33.1314" stroke="#949494" stroke-width="1.5"></path>
              <path d="M40.9681 37.5835L45.7905 34.6989C46.4051 34.3312 47.2014 34.5314 47.569 35.1461V35.1461C47.9366 35.7607 47.7364 36.5569 47.1218 36.9246L42.2995 39.8092" stroke="#949494" stroke-width="1.5"></path>
              <path d="M25.3955 41.8594L15.7508 47.6286" stroke="#949494" stroke-width="1.5"></path>
              <path d="M63.5225 23.082L73.1671 17.3128" stroke="#949494" stroke-width="1.5"></path>
              <path d="M27.1694 44.8281L17.5247 50.5973" stroke="#949494" stroke-width="1.5"></path>
              <path d="M61.7471 20.1152L71.3918 14.346" stroke="#949494" stroke-width="1.5"></path>
              <path d="M37.0234 21.8421L32.2769 17.9941" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M54.4273 41.3844L59.1738 45.2324" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M41.8508 18.987L40.5732 13.0117" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
              <path d="M49.5994 44.2395L50.877 50.2148" stroke="#949494" stroke-line-cap="round" stroke-width="1.5"></path>
            </g>
            <defs>
              <clipPath id="clip0_1542_29859">
                <rect fill="white" height="64" width="88"></rect>
              </clipPath>
            </defs>
          </svg>
          <p class="railz-error-title" style="font-size: 50px;">
            Oops, something went wrong
          </p>
        </div>
      </mock:shadow-root>
    </railz-error-image>
    `);
  });
});

// yarn test packages/components/src/elements/error/test/error-image.spec.tsx
