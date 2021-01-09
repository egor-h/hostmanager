package ru.serovmp.hostmanager.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
public class AbstractAuditableEntity<U, ID> extends AbstractSerializableEntity<ID> implements Serializable {
    @CreatedDate
    private Date createdAt;
    @CreatedBy
    private U createdBy;
}

