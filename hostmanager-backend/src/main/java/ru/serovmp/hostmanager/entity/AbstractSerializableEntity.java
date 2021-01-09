package ru.serovmp.hostmanager.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@Getter
@Setter
@MappedSuperclass
public class AbstractSerializableEntity<ID> implements Serializable {
    @Id
    @GeneratedValue
    private ID id;
}

