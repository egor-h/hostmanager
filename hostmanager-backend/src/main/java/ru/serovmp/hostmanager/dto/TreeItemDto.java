package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.TreeItem;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TreeItemDto {
    private long id;
    private String name;
    private long parent;
    private List<TreeItemDto> children;
}
