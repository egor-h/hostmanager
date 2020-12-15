package ru.serovmp.hostmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "hosts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Host {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    @EqualsAndHashCode.Include
    private long id;
    @Getter @Setter
    @NotNull @Length(min = 1)
    private String name;
    @Getter @Setter
    @NotNull @Length(min = 1)
    private String address;

//    private List<Protocol> protocols;
//    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @Getter @Setter
    private Host parent;

    @Getter @Setter
    private Date createdAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Setter
    private Set<Host> children = new HashSet<>();

    @Getter @Setter
    boolean isDir;

    @JsonIgnore
    public Set<Host> getChildren() {
        return children;
    }
}

