package ru.serovmp.hostmanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "hosts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Host implements Serializable {
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
    @Column(name = "dir")
    boolean isDir;

    @Getter @Setter @Column(name = "enabled")
    boolean enabled;

    @Getter @Setter
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "hosts_tags",
            joinColumns = { @JoinColumn(name = "host_id") },
            inverseJoinColumns = { @JoinColumn(name = "tags_id") })
    private Set<Tag> tags = new HashSet<>();

    @Getter @Setter
    @ManyToMany(targetEntity = Protocol.class, fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "hosts_protocols",
            joinColumns = { @JoinColumn(name = "host_id") },
            inverseJoinColumns = { @JoinColumn(name = "protocols_id") })
    private Set<Protocol> protocols = new HashSet<>();

    @Getter @Setter
    @ManyToMany(targetEntity = Note.class, fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "hosts_notes",
            joinColumns = { @JoinColumn(name = "host_id") },
            inverseJoinColumns = { @JoinColumn(name = "note_id") })
    private Set<Note> notes = new HashSet<>();

    @JsonIgnore
    public Set<Host> getChildren() {
        return children;
    }
}

