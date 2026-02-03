import os, sys, json, re
from concurrent.futures import ThreadPoolExecutor, as_completed

# 设置控制台输出编码为 UTF-8
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")


# 截取文件
def truncate_file(file_path, position):
    """
    截取文件到指定位置
    """

    try:
        # 打开文件以进行读写操作
        with open(file_path, "r+") as file:
            # 获取文件截取前的实际大小
            original_size = file.seek(0, os.SEEK_END)

            # 移动到截取位置
            file.seek(position)

            # 执行截取操作
            file.truncate()

            # 获取截取后的文件大小
            new_size = file.seek(0, os.SEEK_END)

            # 输出截取前后的文件大小差异
            size_difference = original_size - new_size
            if size_difference > 0:
                print(file_path, position)
                print(f"原始文件大小: {original_size} 字节")
                print(f"移动到位置: {position}")
                print(f"文件已被截取到位置: {position}")
                print(f"截取后的文件大小: {new_size} 字节")
                print(f"文件大小变化了: {size_difference} 字节")
            elif size_difference < 0:
                print(file_path, position)
                print(f"原始文件大小: {original_size} 字节")
                print(f"移动到位置: {position}")
                print(f"文件已被截取到位置: {position}")
                print(f"截取后的文件大小: {new_size} 字节")
                print(f"文件大小变化了: {size_difference} 字节")
            else:
                print(file_path, position)
                print(f"原始文件大小: {original_size} 字节")
                print(f"截取后的文件大小: {new_size} 字节")
                print(f"文件大小变化了: {size_difference} 字节")

            return True  # 截取成功

    except Exception as e:
        # 如果在截取过程中出现错误，打印错误信息
        print(f"截取文件时发生错误: {e}")

        return False  # 截取失败


# 使用多线程截取文件
def truncate_files_multithread(file_paths, backup_tmp_path, max_workers=4):
    """
    使用多线程截取多个文件
    """
    # 准备截取任务
    truncate_tasks = []
    for path in file_paths:
        file_name, position = path.split(":")
        position = int(position)
        # 使用正则表达式去掉第一个 "/" 及其前面的内容
        cleaned_file_name = re.sub(r"^[^/]+/", "", file_name)
        real_file_name = os.path.join(backup_tmp_path, cleaned_file_name)
        truncate_tasks.append((real_file_name, position))
    
    # 使用线程池并行截取文件
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # 提交所有截取任务
        futures = {executor.submit(truncate_file, file_path, position): (file_path, position) 
                  for file_path, position in truncate_tasks}
        
        # 等待所有任务完成
        for future in as_completed(futures):
            file_path, position = futures[future]
            try:
                future.result()
            except Exception as e:
                print(f"截取文件 {file_path} 时发生异常: {e}")


if __name__ == "__main__":
    try:
        file_paths_tmp = sys.argv[1]
        backup_tmp_path = sys.argv[2]

        # 将 JSON 字符串转换为数组
        with open(file_paths_tmp, "r") as f:
            file_paths = json.load(f)

        # 使用多线程截取文件
        truncate_files_multithread(file_paths, backup_tmp_path, max_workers=4)
    except:
        """
        # 退出程序引发SystemExit异常, 可以捕获异常执行些清理工作. n默认值为0, 表示正常退出.
        其他都是非正常退出. 还可以sys.exit("sorry, goodbye!"); 一般主程序中使用此退出.
        """
        # sys.exit("sorry, goodbye! --By 梦涵LOVE")
        # sys.exit(1)
