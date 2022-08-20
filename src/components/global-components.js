import { createApp } from 'vue';
import VImg from '@/components/ui/VImg.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import VLoading from '@/components/ui/VLoading.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import RadioBox from '@/components/ui/RadioBox.vue';

const app = createApp({});

app.component('VImg', VImg);
app.component('SvgIcon', SvgIcon);
app.component('VLoading', VLoading);
app.component('CheckBox', CheckBox);
app.component('RadioBox', RadioBox);
