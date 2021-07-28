export default {
  path: 'account',
  menuName: 'Account',
  sort: 5,
  icon: 'microsoft icon-people-team',
  meta: { title: '员工管理' },
  component: () => import('@/views/account/index.vue'),
  children: [
    {
      path: 'department',
      meta: { title: '部门', firstPageName: 'Account_Department' },
      component: () => import('@/views/account/department/index.vue'),
      children: [
        { path: '', name: 'Account_Department', component: () => import('@/views/account/department/list.vue'), meta: { isfirstPage: true, showIntro: true, title: '部门', desc: '描述信息' } },
      ],
    },
    {
      path: 'employee',
      meta: { title: '员工', firstPageName: 'Account_Employee' },
      component: () => import('@/views/account/employee/index.vue'),
      children: [
        { path: '', name: 'Account_Employee', component: () => import('@/views/account/employee/list.vue'), meta: { isfirstPage: true, showIntro: true, title: '员工', desc: '您可以添加运营时的员工，并给予每个员工绑定对应的权限，添加完成后员工可通过手机验证码或微信扫一扫登录管理系统进行日常管理。' } },
      ],
    },
    {
      path: 'access',
      meta: { title: '权限', firstPageName: 'Account_Access' },
      component: () => import('@/views/account/access/index.vue'),
      children: [
        { path: '', name: 'Account_Access', component: () => import('@/views/account/access/list.vue'), meta: { isfirstPage: true, showIntro: true, title: '权限' } },
        { path: 'add', name: 'Account_Access_Add', component: () => import('@/views/account/access/edit.vue'), meta: { title: '新增权限' } },
        { path: 'update/:id', name: 'Account_Access_Update', component: () => import('@/views/account/access/edit.vue'), meta: { title: '修改权限' } },
      ],
    },
  ],
}
