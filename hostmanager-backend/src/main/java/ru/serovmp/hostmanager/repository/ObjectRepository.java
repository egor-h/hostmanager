package ru.serovmp.hostmanager.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.HostObject;

import java.util.List;

@Repository
public interface ObjectRepository extends JpaRepository<HostObject, Long > {
//    @Query(value = "SELECT * FROM hosts WHERE parent_id = :parentId", nativeQuery = true)
    List<HostObject> findByParentId(long parentId);
    List<HostObject> findByParentId(long parentId, Pageable pageable);
    List<HostObject> findByParentId(long parentId, Sort sort);
}
