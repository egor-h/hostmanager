package ru.serovmp.hostmanager.entity;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "protocols")
public class Protocol implements Serializable {
    public static enum LaunchType {
        JUST_RUN, // Run executable
        VALIDATE_EXITCODE, // check if exitcode equals expected value
        VALIDATE_OUTPUT, // validate output with regex
        PRINT_OUTPUT, // like JUST_RUN but also print output (for traceroute)
        INTERNAL // client side handle (like for icmp ping)
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    @EqualsAndHashCode.Include
    private long id;
    private String name;
    private String executionLine;
    private LaunchType launchType;

    @ManyToMany(mappedBy = "protocols", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Host> hosts = new HashSet<>();
}

