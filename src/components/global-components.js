import { createApp } from 'vue';
import Img from '@/components/ui/Img.vue';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import Loading from '@/components/ui/Loading.vue';
import CheckBox from '@/components/ui/CheckBox.vue';
import RadioBox from '@/components/ui/RadioBox.vue';

const app = createApp({});

app.component('Img', Img);
app.component('SvgIcon', SvgIcon);
app.component('Loading', Loading);
app.component('CheckBox', CheckBox);
app.component('RadioBox', RadioBox);
