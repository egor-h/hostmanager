package ru.serovmp.hostmanager.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "locations")
@Entity
public class Locations {
    @Id
    private long id;
    private String name;
}
