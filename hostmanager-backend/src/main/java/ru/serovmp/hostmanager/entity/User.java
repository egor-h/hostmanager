package ru.serovmp.hostmanager.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
@Data
@Builder
public class User {
    @Id
    long id;
    String login;
}
