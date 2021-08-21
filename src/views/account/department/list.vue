<template>
  <div class="component-flex-page template-list-list" ref="componentFlexPageRef">
    <r-table :no-page="true" ref="componentFlexTableRef">
      <template #handleUpRightButtons>
        <el-button type="primary" @click="openAddDialog">添加部门</el-button>
        <el-tooltip effect="light" content="刷新" placement="top">
          <el-button type="info" icon="el-icon-refresh" @click="handleRefresh" :loading="tableLoading"></el-button>
        </el-tooltip>
      </template>
      <template #table>
          <!-- :tree-props="{children: 'children', hasChildren: 'hasChildren'}" -->
        <el-table border size="medium" :max-height="tableHeight"
          v-loading="tableLoading" :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          default-expand-all
          >
          <el-table-column prop="name" label="部门名称" width="180"> </el-table-column>
          <el-table-column prop="sort" label="排序" width="80"> </el-table-column>
          <el-table-column prop="statusLabel" label="状态" width="100"> </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" width="180"> </el-table-column>
          <el-table-column prop="updatedAt" label="修改时间" width="180"> </el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template v-slot="scope">
              <div class="table-cell-link" @click="openUpdateDialog(scope.row)">修改</div>
              <div class="table-cell-link" @click="handleDeleteConfirm(scope.row)">删除</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </r-table>
  </div>

  <!-- <edit-dialog v-model:visible="editDialogData.visible" :edit-data="editDialogData.data" @editSuccess="handleRefresh"></edit-dialog> -->
  <!-- edit-data 不能删，add时用到 -->
  <edit-dialog v-model:visible="editDialogData.visible" :edit-data="editDialogData.data" @editSuccess="handleRefresh"></edit-dialog>
</template>

<script>
import { computed, ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { copy, confirmExecHandle } from 'lisa/utils/func'
// import useTableNoPage from 'lisa/hooks/useTableNoPage1'
import useTableHeight from 'lisa/hooks/useTableHeight'
import { deleteDepartment } from 'api/account'
import EditDialog from './EditDialog.vue'

export default {
  components: {
    EditDialog,
  },
  setup (props, { emit }) {
    const store = useStore()

    const tableData = computed(() => {
      return store.state.resource.department
    })
    const tableLoading = ref(false)

    const editDialogData = reactive({
      visible: false,
      data: { action: 'add' },
    })

    // const {
    //   tableData,
    //   handleRefresh,
    //   goUpdatePage,
    //   openAddDialog,
    //   openUpdateDialog,
    //   editDialogData,
    // } = useTableNoPage(getDataHandle)

    const handleRefresh = () => {
      getData()
    }

    onMounted(() => {
      getData()
    })
    const getData = () => {
      tableLoading.value = true
      store.dispatch('resource/syncDepartment').finally(() => {
        tableLoading.value = false
      })
    }

    const {
      componentFlexPageRef,
      componentFlexTableRef,
      tableHeight,
    } = useTableHeight()

    const getAAA = () => {
      return [
        {
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
        return deleteDepartment(item.id).then(_ => {
          ElMessage.success('删除成功')
          handleRefresh()
        }).catch(_ => {})
      })
    }

    const goUpdatePage = () => {

    }

    const openAddDialog = () => {
      editDialogData.data = { action: 'add' }
      editDialogData.visible = true
    }
    const openUpdateDialog = (item) => {
      editDialogData.data = copy(item)
      editDialogData.visible = true
    }

    return {
      componentFlexPageRef,
      componentFlexTableRef,
      tableHeight,
      handleRefresh,

      handleDeleteConfirm,

      goUpdatePage,
      openAddDialog,
      openUpdateDialog,
      editDialogData,

      tableData,
      tableLoading,
    }
  },
}
</script>

<style lang="scss">
</style>
