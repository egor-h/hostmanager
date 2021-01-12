package ru.serovmp.hostmanager.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "settings")
//@Data
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Setting {
    public static enum Type {
        LONG, FLOAT, STRING, BOOLEAN;
    }
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;
    @ManyToOne
    private User user;
    private String keyName;
    private String value;
    private Type type;
}
