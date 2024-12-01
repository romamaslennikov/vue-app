import VImg from '@/components/base/v-img/VImg.vue';
import SvgIcon from '@/components/base/svg-icon/SvgIcon.vue';
import FontIcon from '@/components/base/font-icon/FontIcon.vue';
import Spinner from '@/components/base/spinner/Spinner.vue';
import VButton from '@/components/base/v-button/VButton.vue';
import Pill from '@/components/base/pill/Pill.vue';
import Hamburger from '@/components/base/hamburger/Hamburger.vue';

export default (app) => {
  app.component('VImg', VImg);
  app.component('SvgIcon', SvgIcon);
  app.component('FontIcon', FontIcon);
  app.component('Spinner', Spinner);
  app.component('VButton', VButton);
  app.component('Pill', Pill);
  app.component('Hamburger', Hamburger);
};
