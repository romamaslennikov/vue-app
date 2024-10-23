import VImg from '@/components/base/VImg.vue';
import SvgIcon from '@/components/base/SvgIcon.vue';
import FontIcon from '@/components/base/font-icon/FontIcon.vue';
import VLoading from '@/components/base/VLoading.vue';
import CheckBox from '@/components/base/fields/CheckBox.vue';
import RadioBox from '@/components/base/fields/RadioBox.vue';
import Hamburger from '@/components/base/Hamburger.vue';
import Popover from '@/components/base/Popover.vue';
import VSelect from '@/components/base/fields/VSelect.vue';
import VButton from '@/components/base/VButton.vue';
import Pill from '@/components/base/Pill.vue';

export default (app) => {
  app.component('VImg', VImg);
  app.component(SvgIcon.name, SvgIcon);
  app.component('FontIcon', FontIcon);
  app.component('VLoading', VLoading);
  app.component('CheckBox', CheckBox);
  app.component('RadioBox', RadioBox);
  app.component('Hamburger', Hamburger);
  app.component(Popover.name, Popover);
  app.component(VSelect.name, VSelect);
  app.component('VButton', VButton);
  app.component('Pill', Pill);
};
