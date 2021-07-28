<template>
  <div class="component-flex-page template-list-list" ref="componentFlexPageRef">
    <r-table :no-page="true" ref="componentFlexTableRef">
      <template #handleUpRightButtons>
        <el-button type="primary" @click="openAddDialog">添加权限</el-button>
        <el-tooltip effect="light" content="刷新" placement="top">
          <el-button type="info" icon="el-icon-refresh" @click="handleRefresh" :loading="tableData.tableLoading"></el-button>
        </el-tooltip>
      </template>
      <template #table>
        <el-table border size="medium" :max-height="tableData.tableHeight"
          v-loading="tableData.tableLoading" :data="tableData.tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </template>
    </r-table>
  </div>

  <!-- <edit-dialog v-model:visible="editDialogData.visible" :edit-data="editDialogData.data" @editSuccess="handleRefresh"></edit-dialog> -->
  <!-- edit-data 不能删，add时用到 -->
  <edit-dialog v-model:visible="editDialogData.visible" :id="editDialogData.data.id" :edit-data="editDialogData.data" @editSuccess="handleRefresh"></edit-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { confirmExecHandle, filter } from 'lisa/utils/func'
import useTableNoPage from 'lisa/hooks/useTableNoPage'
import { listUser, deleteUser } from 'api/template'
import EditDialog from './EditDialog.vue'

export default {
  components: {
    EditDialog,
  },
  setup (props, { emit }) {
    const getDataHandle = async (query) => {
      // return listUser(query).then(res => {
      //   let list = res.items || []
      //   list = list.map(x => {
      //     return {
      //       id: x.id,
      //       name: x.name,
      //       age: x.age,
      //       birth: x.birth,
      //       sex: x.sex,
      //       sexLabel: filter('sex', x.sex),
      //       addr: x.addr,
      //     }
      //   })
      // })
      const list = getAAA()
      return list
    }

    const {
      componentFlexPageRef,
      componentFlexTableRef,
      tableData,
      handleRefresh,
      goUpdatePage,
      openAddDialog,
      openUpdateDialog,
      editDialogData,
    } = useTableNoPage(getDataHandle)

    const getAAA = () => {
      return [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            }],
          }],
        }],
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 5,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 6,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 7,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 8,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 9,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 10,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 11,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
      {
        id: 12,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }]
    }

    const handleDeleteConfirm = (item) => {
      confirmExecHandle('提示', `此操作将永久删除员工 ${item.name}, 是否继续?`, () => {
        return deleteUser(item.id).then(_ => {
          ElMessage.success('删除成功')
          handleRefresh()
        }).catch(_ => {})
      })
    }
    const handleBatchDeleteConfirm = () => {
      confirmExecHandle('提示', `确认删除选中的${tableData.selectedTable.length}个用户吗？`, () => {
        const apis = tableData.selectedTable.map(x => deleteUser(x.id))
        return Promise.all(apis).then(_ => {
          ElMessage.success('批量执行成功')
          handleRefresh()
        }).catch(_ => {})

        // 有些资源有批量删除接口
        // let ids = this.selectedTable.map(x => x.id)
        // return batchDeleteUser(ids).then(res => {
        //   this.refresh()
        //   this.$message.success('执行成功')
        // }).catch(_ => {})
      })
    }

    return {
      componentFlexPageRef,
      componentFlexTableRef,
      tableData,
      handleRefresh,

      handleDeleteConfirm,
      handleBatchDeleteConfirm,

      goUpdatePage,
      openAddDialog,
      openUpdateDialog,
      editDialogData,
    }
  },
}
</script>

<style lang="scss">
</style>
