package ru.serovmp.hostmanager.service.search;

public interface Indexable<T> {
    void startIndex();
    String entityToIndexableText(T e);
}
