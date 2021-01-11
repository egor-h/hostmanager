package ru.serovmp.hostmanager.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id @GeneratedValue
    private long id;
    private String name;
    private String description;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;
}
