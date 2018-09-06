import Vue from 'vue'
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Select,
  Option,
  Icon,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Tag,
  Container,
  Header,
  Aside,
  Main,
  Message,
  MessageBox,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
