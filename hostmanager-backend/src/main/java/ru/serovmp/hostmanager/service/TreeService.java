package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.controller.form.TreeForm;
import ru.serovmp.hostmanager.dto.TreeItemDto;

public interface TreeService {
    TreeItemDto tree(long id);
    TreeItemDto create(TreeForm treeForm, long parentId);
    TreeItemDto update(long id, TreeForm treeForm);
    void delete(long id);

}
