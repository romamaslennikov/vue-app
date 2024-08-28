import VImg from '@/components/ui/VImg.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import VLoading from '@/components/ui/VLoading.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import RadioBox from '@/components/ui/RadioBox.vue';
import Hamburger from '@/components/ui/Hamburger.vue';
import Popover from '@/components/ui/Popover.vue';
import VSelect from '@/components/ui/VSelect.vue';

export default (app) => {
  app.component(VImg.name, VImg);
  app.component(SvgIcon.name, SvgIcon);
  app.component(VLoading.name, VLoading);
  app.component(CheckBox.name, CheckBox);
  app.component(RadioBox.name, RadioBox);
  app.component(Hamburger.name, Hamburger);
  app.component(Popover.name, Popover);
  app.component(VSelect.name, VSelect);
};
