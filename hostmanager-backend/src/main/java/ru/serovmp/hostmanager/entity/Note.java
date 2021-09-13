package ru.serovmp.hostmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "notes")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Note extends AbstractSerializableEntity<Long> implements Serializable {
    private String title;
    private String text;
    private boolean done;
    private Date createdAt;
//    private User createdBy;
    private Date doneAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "notes", fetch = FetchType.LAZY)
    private Set<Host> hosts;


}
