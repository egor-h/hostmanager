package ru.serovmp.hostmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tree")
@AllArgsConstructor
@NoArgsConstructor
public class TreeItem extends AbstractAuditableEntity {

    @Getter @Setter
    private String name;
//    private boolean dir; // keep flag before splitting table `hosts`

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @Getter @Setter
    private TreeItem parent;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    @Getter @Setter
    private List<TreeItem> children;


}
