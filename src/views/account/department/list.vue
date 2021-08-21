<template>
  <div class="component-flex-page template-list-list" ref="componentFlexPageRef">
    <r-table :no-page="true" ref="componentFlexTableRef">
      <template #handleUpRightButtons>
        <el-button type="primary" @click="openAddDialog">添加部门</el-button>
        <el-tooltip effect="light" content="刷新" placement="top">
          <el-button type="info" icon="el-icon-refresh" @click="handleRefresh" :loading="tableData.tableLoading"></el-button>
        </el-tooltip>
      </template>
      <template #table>
        <el-table border size="medium" :max-height="tableData.tableHeight"
          v-loading="tableData.tableLoading" :data="tableData.tableData"
          row-key="id"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
          <el-table-column prop="name" label="部门名称" width="180"> </el-table-column>
          <el-table-column prop="sort" label="排序" width="80"> </el-table-column>
          <el-table-column prop="statusLabel" label="状态" width="100">
            <template v-slot="scope">
              <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.statusLabel}}</el-tag>
            </template>
          </el-table-column>
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

  <edit-dialog v-model:visible="editDialogData.visible" :edit-data="editDialogData.data" @editSuccess="handleRefresh"></edit-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import { confirmExecHandle, filter, format, unlimitedForLayer } from 'lisa/utils/func'
import useTableNoPage from 'lisa/hooks/useTableNoPage'
import { listDepartment, deleteDepartment } from 'api/account'
import EditDialog from './EditDialog.vue'
import { useStore } from 'vuex'

export default {
  components: {
    EditDialog,
  },
  setup (props, { emit }) {
    const store = useStore()
    const getDataHandle = async (query) => {
      return listDepartment().then(res => {
        const list = res.items || []
        const data = list.map(x => {
          return {
            id: x._id,
            name: x.name,
            sort: x.sort,
            parentId: x.parentId || 0,
            status: x.status,
            statusLabel: filter('useStopStatus', x.status),
            remark: x.remark,
            createdAt: format('second', x.createdAt),
            updatedAt: format('second', x.updatedAt),
          }
        })
        const tree = list.map(x => {
          return {
            id: x._id,
            label: x.name,
            parentId: x.parentId || 0,
          }
        })
        // 保存部门树
        store.commit('resource/SET_DEPARTMENT_TREE', unlimitedForLayer(tree, 0))
        return unlimitedForLayer(data)
      })
    }

    const {
      componentFlexPageRef,
      componentFlexTableRef,
      tableData,
      handleRefresh,
      openAddDialog,
      openUpdateDialog,
      editDialogData,
    } = useTableNoPage(getDataHandle)

    const handleDeleteConfirm = (item) => {
      if (item.children.length) {
        ElMessage.warning('该部门下包含子部门，请先删除子部门')
        return
      }
      confirmExecHandle('提示', `此操作将永久删除部门 ${item.name}, 是否继续?`, () => {
        return deleteDepartment(item.id).then(_ => {
          ElMessage.success('删除成功')
          handleRefresh()
        }).catch(_ => {})
      })
    }

    return {
      componentFlexPageRef,
      componentFlexTableRef,
      tableData,
      handleRefresh,

      handleDeleteConfirm,

      openAddDialog,
      openUpdateDialog,
      editDialogData,
    }
  },
}
</script>

<style lang="scss">
</style>
