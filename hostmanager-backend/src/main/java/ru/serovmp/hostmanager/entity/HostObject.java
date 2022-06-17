package ru.serovmp.hostmanager.entity;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "hosts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HostObject extends AbstractAuditableEntity implements Serializable {
    @Getter @Setter
    @Column(name = "parent_id")
    private long parentId;

    @Getter
    @Setter
    @NotNull
    @Length(min = 1)
    private String name;
    @Getter @Setter
    @NotNull @Length(min = 1)
    private String address;

    @Getter @Setter
    private int port;

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

    @Getter @Setter
    @ManyToMany(targetEntity = Location.class, fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "hosts_locations",
            joinColumns = { @JoinColumn(name = "host_id")},
            inverseJoinColumns = { @JoinColumn(name = "location_id")}
    )
    private Set<Location> locations;

}
