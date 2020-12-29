package ru.serovmp.hostmanager.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "hosts")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @EqualsAndHashCode.Include
    private long id;

    private String title;
    private boolean done;


}
