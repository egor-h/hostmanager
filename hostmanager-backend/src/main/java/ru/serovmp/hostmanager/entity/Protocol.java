package ru.serovmp.hostmanager.entity;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "protocols")
public class Protocol {
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

    @ManyToMany(targetEntity = Host.class)
    private List<Host> hosts;
}

